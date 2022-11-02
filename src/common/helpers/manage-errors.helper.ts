import { HttpStatus } from '@nestjs/common';
import { ErrorData } from '../interfaces';

export const getError = (error: any): ErrorData => {
  // SECTION: Errores de validación de datos de NestJS
  if (error.response) {
    const { response } = error;
    switch (error.status) {
      case 400:
      case 401:
      case 403:
      case 404:
        return response;
      default:
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al procesar la solicitud',
          error: 'Internal Server Error',
        };
    }
  }
  // !SECTION

  // SECTION: Errores de validación de datos de PostgreSQL
  // NOTE: ESTA SECCION DEBE DE CAMBIARSE POR LOS ERRORES DE SQL SERVER
  if (error.code) {
    switch (error.code) {
      case '23505':
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.detail,
          error: 'Bad Request',
        };
      default:
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al realizar la operación',
          error: 'Internal Server Error',
        };
    }
  }
  // !SECTION

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: `Ha ocurrido un error. Si persiste contacte a soporte técnico`,
    error: 'Internal Server Error',
  };
};
