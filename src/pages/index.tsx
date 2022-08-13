import { KeyboardEvent, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useQueryBooks } from "../hooks/useQueryBooks";
import Loader from "../components/Loader";
import Categories from "../components/Categories";

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

const IMAGE_NOT_FOUND = "/assets/images/broken_image.png";

export default function Home() {
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const { data, isLoading} = useQueryBooks(`books-${search}`, search)

  function keyDownHandler(event: KeyboardEvent<HTMLInputElement>) {
    const { key } = event;
    
    if ( key === "Enter") {
      setSearch( inputText );
    }
  }

  return (
    <div className="flex justify-center h-screen w-full">
      <div className="container">
        <div className="flex bg-white px-8 py-4 rounded-3xl h-max mt-4 gap-4 border-2">
          <div className="flex flex-col w-full">
            <div className="flex items-center w-full">
              <div className="flex justify-center w-[18%]">
                <Image src="/assets/images/logo.png" alt="Thumbnail Book" width={220} height={100} />
              </div>
              <div className="flex w-[74%]">
                <div className="flex relative w-full">
                  <input type="text" autoFocus onKeyDown={e => keyDownHandler(e)} onChange={ evt => setInputText(evt.target.value)} value={inputText} className="border-2 h-6 sm:h-7 md:h-10 w-full rounded-3xl pl-2 md:pl-4 bg-[#F7F9F6] text-[0.60rem] md:text-base" />
                  <div className="flex absolute right-3 md:right-6 pt-1 sm:pt-2 px-2 border-l-2 h-full cursor-pointer" onClick={() => setSearch( inputText )}>
                    <svg aria-hidden="true" className="w-3 md:w-5 h-3 md:h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  {
                    inputText ? (
                      <div className="flex absolute right-10 md:right-16 pt-1 sm:pt-2 px-2 h-full cursor-pointer" onClick={ () => setInputText("") } >
                        <svg aria-hidden="true" className="w-3 md:w-5 h-3 md:h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </div>
                    ) : null
                  }
                </div>
              </div>
              <div className="flex w-[8%]">
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <Categories />
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-white rounded-3xl mt-2">
        {
          isLoading 
            ? <Loader />
            : (
              <ul className="flex flex-wrap w-full gap-2 px-4 ">
                {
                  data?.items.map( (book, index) => {
                    const { volumeInfo } = book;
                    const { title, subtitle, imageLinks, authors, infoLink } = volumeInfo;
      
                    return (
                      <li key={index} className="flex justify-end border-2 border-[#F3F1F5] grow w-full md:w-[49%] gap-4 my-2 cursor-pointer rounded-3xl">
                        <div className="flex w-full p-2">
                          <Link href={infoLink} passHref>
                            <a className="flex w-full" target="_blank" rel="noopener noreferrer">
                              <Image src={imageLinks ? imageLinks.thumbnail : IMAGE_NOT_FOUND} alt="Thumbnail Book" width={170} height={200} className="rounded-3xl" />
                              <div className="flex flex-col w-full px-6">
                                <h1 className="font-bold text-[#262133] text-xs md:text-base">{title}</h1>
                                <h2 className="text-xs md:text-sm">{subtitle}</h2>
                                <ul className="mt-2 text-[0.60rem] md:text-sm text-[#6C6D75]">
                                  {
                                    authors?.map( ( author, index ) => <li key={index}>{author}</li> )
                                  }
                                </ul>
                              </div>
                            </a>
                          </Link>
                        </div>
                        <div className="w-[5%] bg-[#BFA2DB] rounded-r-3xl"></div>
                      </li>
                    )
                  })
                }
              </ul>
            )
        }
        </div>
      </div>
    </div>
  )
}