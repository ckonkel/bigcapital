export const initialValues = {
  templateName: '',

  // Colors
  primaryColor: '#2c3dd8',
  secondaryColor: '#2c3dd8',

  // Company logo.
  showCompanyLogo: true,
  companyLogo:
    'https://cdn-development.mercury.com/demo-assets/avatars/mercury-demo-dark.png',

  // Address
  showBilledToAddress: true,
  showBilledFromAddress: true,
  billedToLabel: 'Bill To',

  // Entries
  itemNameLabel: 'Item',
  itemDescriptionLabel: 'Description',
  itemRateLabel: 'Rate',
  itemTotalLabel: 'Total',

  // Total
  showTotal: true,
  totalLabel: 'Total',

  // Subtotal
  showSubtotal: true,
  subtotalLabel: 'Subtotal',

  // Customer Note.
  showCustomerNote: true,
  customerNoteLabel: 'Customer Note',

  // Terms & Conditions
  showTermsConditions: true,
  termsConditionsLabel: 'Terms & Conditions',

  // Date issue.
  creditNoteDateLabel: 'Issue of Date',
  showCreditNoteDate: true,

  // Credit Number.
  creditNoteNumberLabel: 'Credit Note #',
  showCreditNoteNumber: true,
};

export const fieldsGroups = [
  {
    label: 'Header',
    fields: [
      {
        labelKey: 'creditNoteDateLabel',
        enableKey: 'showCreditNoteDate',
        label: 'Issue of Date',
      },
      {
        labelKey: 'creditNoteNumberLabel',
        enableKey: 'showCreditNoteNumber',
        label: 'Credit Note #',
      },
      {
        enableKey: 'showBilledToAddress',
        labelKey: 'billedToLabel',
        label: 'Bill To',
      },
      {
        enableKey: 'showBilledFromAddress',
        label: 'Billed From',
      },
    ],
  },
  {
    label: 'Totals',
    fields: [
      {
        labelKey: 'subtotalLabel',
        enableKey: 'showSubtotal',
        label: 'Subtotal',
      },
      { labelKey: 'totalLabel', enableKey: 'showTotal', label: 'Total' },
    ],
  },
  {
    label: 'Footer',
    fields: [
      {
        labelKey: 'termsConditionsLabel',
        enableKey: 'showTermsConditions',
        label: 'Terms & Conditions',
      },
      {
        labelKey: 'customerNoteLabel',
        enableKey: 'showCustomerNote',
        label: 'Customer Note',
        labelPlaceholder: 'Customer Note',
      },
    ],
  },
];
