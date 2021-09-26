import React, { useMemo } from 'react';
import { Menu, MenuItem, MenuDivider, Intent } from '@blueprintjs/core';
import clsx from 'classnames';

import intl from 'react-intl-universal';

import { Icon, Money, If, AvaterCell } from 'components';

import { safeCallback } from 'utils';

/**
 * Actions menu.
 */
export function ActionsMenu({
  row: { original },
  payload: {
    onEdit,
    onDelete,
    onDuplicate,
    onInactivate,
    onActivate,
    onViewDetails,
  },
}) {
  return (
    <Menu>
      <MenuItem
        icon={<Icon icon="reader-18" />}
        text={intl.get('view_details')}
        onClick={safeCallback(onViewDetails, original)}
      />
      <MenuDivider />
      <MenuItem
        icon={<Icon icon="pen-18" />}
        text={intl.get('edit_customer')}
        onClick={safeCallback(onEdit, original)}
      />
      <MenuItem
        icon={<Icon icon="duplicate-16" />}
        text={intl.get('duplicate')}
        onClick={safeCallback(onDuplicate, original)}
      />
      <If condition={original.active}>
        <MenuItem
          text={intl.get('inactivate_customer')}
          icon={<Icon icon="pause-16" iconSize={16} />}
          onClick={safeCallback(onInactivate, original)}
        />
      </If>
      <If condition={!original.active}>
        <MenuItem
          text={intl.get('activate_customer')}
          icon={<Icon icon="play-16" iconSize={16} />}
          onClick={safeCallback(onActivate, original)}
        />
      </If>
      <MenuItem
        icon={<Icon icon="trash-16" iconSize={16} />}
        text={intl.get('delete_customer')}
        intent={Intent.DANGER}
        onClick={safeCallback(onDelete, original)}
      />
    </Menu>
  );
}

/**
 * Phone number accessor.
 */
export function PhoneNumberAccessor(row) {
  return <div className={'work_phone'}>{row.work_phone}</div>;
}

/**
 * Balance accessor.
 */
export function BalanceAccessor(row) {
  return <Money amount={row.closing_balance} currency={row.currency_code} />;
}

/**
 * Retrieve customers table columns.
 */
export function useCustomersTableColumns() {
  return useMemo(
    () => [
      {
        id: 'avatar',
        Header: '',
        Cell: AvaterCell,
        className: 'avatar',
        width: 45,
        disableResizing: true,
        disableSortBy: true,
        clickable: true,
      },
      {
        id: 'display_name',
        Header: intl.get('display_name'),
        accessor: 'display_name',
        className: 'display_name',
        width: 150,
        clickable: true,
      },
      {
        id: 'company_name',
        Header: intl.get('company_name'),
        accessor: 'company_name',
        className: 'company_name',
        width: 150,
        clickable: true,
      },
      {
        id: 'work_phone',
        Header: intl.get('work_phone'),
        accessor: PhoneNumberAccessor,
        className: 'phone_number',
        width: 100,
        clickable: true,
      },
      {
        id: 'balance',
        Header: intl.get('receivable_balance'),
        accessor: BalanceAccessor,
        align: 'right',
        width: 100,
        clickable: true,
      },
    ],
    [],
  );
}
