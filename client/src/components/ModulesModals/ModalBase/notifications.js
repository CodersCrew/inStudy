export const addNotification = ({ title }) => ({
  title: 'Dodałeś moduł',
  message: `Do profilu został dodany moduł ${title}.`,
});

export const updateNotification = ({ title }) => ({
  title: 'Zaktualizowałeś moduł',
  message: `Moduł ${title} został zaktualizowany pomyślnie.`,
});

export const deleteNotification = ({ title }) => ({
  title: 'Usunąłeś moduł',
  message: `Moduł ${title} został usunięty z profilu`,
});
