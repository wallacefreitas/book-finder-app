import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

interface Volume {
  title: string;
  subtitle: string;
  imageLinks?: ImageLinks;
  authors: Array<String>;
  infoLink: string;
}

interface Books {
  id: string;
  volumeInfo: Volume;
}

interface Items {
  items: Books[]
}

export const listBooks = async (search: string) => {
  if (search) {
    const response = await axios.get(`/volumes?q=${search}+inauthor:${search}`);
    return response.data;
  }
}

export const useQueryBooks = (key: string, search: string) => {
  return useQuery<Items>([key], () => listBooks(search));
}