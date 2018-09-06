const urlRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const required = (value) => {
  let isEmpty;
  if (Array.isArray(value)) {
    isEmpty = value.length === 0;
  } else if (typeof value === 'object' && value !== null) {
    isEmpty = Object.keys(value).reduce((a, c) => a && !value[c], true);
  } else {
    isEmpty = !value || !String(value).trim();
  }

  return isEmpty && 'To pole jest wymagane';
};

export const maxLength = maxCharactersCount => value => value?.length > maxCharactersCount
  && `Tekst nie może być dłuższy niż ${maxCharactersCount} znaków`;

export const url = value => !urlRegExp.test(value) && 'Błędny adres URL';

export const isEemail = value => !emailRegExp.test(value) && 'Błędny adres e-mail';
