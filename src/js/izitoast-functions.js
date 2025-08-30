import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function noDataIzT(message) {
  iziToast.show({
    title: '❌',
    message: `Sorry, there are no ${message}.`,
    color: 'red',
    position: 'topRight',
    messageColor: 'white',
    titleColor: 'white',
  });
}

export function errorApiIzT(error) {
  iziToast.show({
    title: 'Error',
    color: 'red',
    position: 'topRight',
    messageColor: 'white',
    titleColor: 'white',
    message: error.message,
  });
}

export function successDataIzT(response) {
  iziToast.success({
    message: response.data.message,
    position: 'topRight',
    messageColor: 'white',
    titleColor: 'white',
  });
}
