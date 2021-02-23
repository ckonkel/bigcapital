import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import useApiRequest from '../useRequest';
import t from 'store/types';

/**
 * Saves the settings.
 */
export function useSaveSettings(props) {
  const queryClient = useQueryClient();
  const apiRequest = useApiRequest();

  return useMutation((settings) => apiRequest.post('settings', settings), {
    onSuccess: () => {
      queryClient.invalidateQueries('SETTINGS');
    },
    ...props,
  });
}

function useSettingsQuery(key, query, props) {
  const dispatch = useDispatch();
  const apiRequest = useApiRequest();

  return useQuery(
    key,
    () => apiRequest.get('settings', { params: query }),
    {
      select: (res) => res.data.settings,
      initialDataUpdatedAt: 0,
      initialData: {
        data: {
          settings: [],
        },
      },
      onSuccess: (settings) => {
        dispatch({ type: t.SETTING_SET, options: settings });
      },
      ...props,
    },
  );
}

/**
 * Retrieve the all settings of the organization.
 */
export function useSettings() {
  return useSettingsQuery(['SETTINGS', 'ALL'], {});
}

/**
 * Retrieve invoices settings.
 */
export function useSettingsInvoices(props) {
  return useSettingsQuery(
    ['SETTINGS', 'INVOICES'],
    { group: 'sale_invoices' },
    props,
  );
}

/**
 * Retrieve invoices settings.
 */
export function useSettingsEstimates(props) {
  return useSettingsQuery(
    ['SETTINGS', 'ESTIMATES'],
    { group: 'sale_estimates' },
    props,
  );
}

/**
 * Retrieve payment receives settings.
 */
export function useSettingsPaymentReceives(props) {
  return useSettingsQuery(
    ['SETTINGS', 'PAYMENT_RECEIVES'],
    { group: 'payment_receives' },
    props,
  );
}

/**
 * Retrieve sale receipts settings.
 * @param {*} props 
 */
export function useSettingsReceipts(props) {
  return useSettingsQuery(
    ['SETTINGS', 'RECEIPTS'],
    { group: 'sale_receipts' },
    props,
  );
}

/**
 * Retrieve sale receipts settings.
 * @param {*} props 
 */
export function useSettingsManualJournals(props) {
  return useSettingsQuery(
    ['SETTINGS', 'MANUAL_JOURNALS'],
    { group: 'sale_receipts' },
    props,
  );
}