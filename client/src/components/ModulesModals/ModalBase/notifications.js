export const addNotification = ({ title }) => ({
  title: 'Dodałeś moduł',
  message: `Do profilu został dodany moduł ${title}.`,
  status: 'success',
  dismissible: true,
  dismissAfter: 3000,
});

export const updateNotification = ({ title }) => ({
  title: 'Zaktualizowałeś moduł',
  message: `Moduł ${title} został zaktualizowany pomyślnie.`,
  status: 'success',
  dismissible: true,
  dismissAfter: 3000,
});

export const deleteNotification = ({ title }) => ({
  title: 'Usunąłeś moduł',
  message: `Moduł ${title} został usunięty z profilu`,
  status: 'success',
  dismissible: true,
  dismissAfter: 3000,
});
