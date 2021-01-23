import React, { useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';

import ReceiptFrom from './ReceiptForm';
import DashboardInsider from 'components/Dashboard/DashboardInsider';

import withCustomersActions from 'containers/Customers/withCustomersActions';
import withAccountsActions from 'containers/Accounts/withAccountsActions';
import withItemsActions from 'containers/Items/withItemsActions';
import withReceiptActions from './withReceiptActions';
import withSettingsActions from 'containers/Settings/withSettingsActions';
import withDashboardActions from 'containers/Dashboard/withDashboardActions';

import { compose } from 'utils';

function ReceiptFormPage({
  //#withwithAccountsActions
  requestFetchAccounts,

  //#withCustomersActions
  requestFetchCustomers,

  //#withItemsActions
  requestFetchItems,

  //#withReceiptsActions
  requestFetchReceipt,

  // #withSettingsActions
  requestFetchOptions,

  // #withDashboardActions
  setSidebarShrink,
  resetSidebarPreviousExpand,
  setDashboardBackLink,
}) {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    // Shrink the sidebar by foce.
    setSidebarShrink();
    // Show the back link on dashboard topbar.
    setDashboardBackLink(true);

    return () => {
      // Reset the sidebar to the previous status.
      resetSidebarPreviousExpand();
      // Hide the back link on dashboard topbar.
      setDashboardBackLink(false);
    };
  }, [resetSidebarPreviousExpand, setSidebarShrink, setDashboardBackLink]);

  const fetchReceipt = useQuery(
    ['receipt', id],
    (key, _id) => requestFetchReceipt(_id),
    { enabled: !!id },
  );
  const fetchAccounts = useQuery('accounts-list', (key) =>
    requestFetchAccounts(),
  );

  const fetchCustomers = useQuery('customers-table', () =>
    requestFetchCustomers({}),
  );

  // Handle fetch Items data table or list
  const fetchItems = useQuery('items-table', () => requestFetchItems({}));

  const fetchSettings = useQuery(['settings'], () => requestFetchOptions({}));

  const handleFormSubmit = useCallback(
    (payload) => {
      payload.redirect && history.push('/receipts');
    },
    [history],
  );

  const handleCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <DashboardInsider
      loading={
        fetchCustomers.isFetching ||
        fetchItems.isFetching ||
        fetchAccounts.isFetching ||
        fetchReceipt.isFetching
      }
      name={'receipt-form'}
    >
      <ReceiptFrom
        onFormSubmit={handleFormSubmit}
        receiptId={id}
        onCancelForm={handleCancel}
      />
    </DashboardInsider>
  );
}

export default compose(
  withReceiptActions,
  withCustomersActions,
  withItemsActions,
  withAccountsActions,
  withSettingsActions,
  withDashboardActions,
)(ReceiptFormPage);