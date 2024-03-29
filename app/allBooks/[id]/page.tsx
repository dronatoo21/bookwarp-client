/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ReviewCart from "./ReviewCart.jsx";
import ReviewModal from "./ReviewModal.jsx";

const Detail = (props: any) => {
  const [book, setBook] = useState<any>([]);
  const [review, setReview] = useState<any>([]);
  const [userReview, setUserReview] = useState([]);

  const idURL = `https://bookwarp-server.vercel.app/allBooks/${props.params.id}`;
  useEffect(() => {
    fetch(idURL)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [idURL]);
  const {
    _id,
    id,
    cover,
    title,
    writer,
    price,
    description,
    category,
    ratings,
  } = book;

  useEffect(() => {
    axios.get(`https://bookwarp-server.vercel.app/review`).then((res) => {
      setReview(res.data);
    });
  }, []);

  return (
    <div className="bg-white  text-black dark:bg-black dark:text-white">
      <h1 className="font-bold text-3xl text-center mt-14 mb-2">Book Detail</h1>
      <div className="card  border shadow-xl p-5">
        <figure>
          <img className="rounded-lg lg:h-[400px]" src={cover} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-bold text-center mx-auto">{title}</h2>
          <p className="font-normal">
            <span className="font-semibold">Writer: </span>
            {writer}
          </p>
          <p className="font-normal">
            <span className="font-semibold">About: </span>
            {description}
          </p>
          <p className="font-normal">
            <span className="font-semibold">Category: </span>
            {category}
          </p>
          <p className="font-normal">
            <span className="font-semibold">Ratings: </span>
            {ratings}
          </p>
          <p className="font-bold">
            <span className="font-semibold">Price: </span>
            {price}$
          </p>
        </div>
      </div>
      <div>
        <ReviewModal
          setUserReview={setUserReview}
          userReview={userReview}
          id={id}
        />
        <h2 className="text-center text-3xl font-bold py-10">
          Customer Review
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* review */}
        {review.map((review:any) => (
          <ReviewCart key={review} review={review} />
        ))}

        {/* <ReviewCart /> */}
      </div>
    </div>
  );
};

export default Detail;
