import * as HttpService from './http.service';
import { CREATE_BOOK,GET_CATEGORIES ,GET_BOOKS ,UPDATE_BOOK } from './url.service';


export const createBook = ( data) => HttpService.postWithOutAuth(CREATE_BOOK, data);

export const updateBook = ( data) => HttpService.putWithOutAuth(UPDATE_BOOK, data);

export const getCategories = () => HttpService.getWithOutAuth(GET_CATEGORIES);

export const getBooks = ({search,take,skip,categoryId}) => HttpService.getWithOutAuth(GET_BOOKS({search,take,skip,categoryId}))