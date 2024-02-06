"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://bookwarp-server.vercel.app/allBooks")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, [books]);

  const handleBookDelete = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://bookwarp-server.vercel.app/allBooks/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Bookmark has been deleted.",
                icon: "success",
              });
              const remaining = books.filter(
                (bookmark: any) => bookmark._id !== id
              );
              setBooks(remaining);
            }
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold">Manage Books</h2>
      <div className=" bg-white p-8 rounded">
        <table className="min-w-full">
          <colgroup>
            <col className="" />
            <col className="" />
            <col className="" />
            <col className="" />
            <col className="" />
          </colgroup>
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-6">Image</th>
              <th className="p-6">Books Name</th>
              <th className="p-6">Writer</th>
              <th className="p-6">Price</th>
              <th className="p-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book: any) => (
              <tr key={book.id} book={book} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    className="object-cover hidden md:block"
                    src="https://i.ibb.co/zJqP1Ky/banner.png"
                    alt="Landscape picture"
                    height={50}
                    width={50}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  {book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{book.writer}</td>
                <td className="px-6 py-4 whitespace-nowrap">${book.price}</td>
                <td className="px-6 py-4 whitespace-nowrap flex justify-end">
                  <button
                    onClick={() => handleBookDelete(book._id)}
                    className="border px-4 py-2 text-red-500 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
