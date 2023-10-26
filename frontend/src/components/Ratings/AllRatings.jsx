import React, { useEffect, useState } from "react";
import HeadDiv from "../utils/HeadDiv";
import { AiFillStar } from "react-icons/ai";
import { getReviews } from "../../Api/api";
import Modal from "../Modal/Modal";
import CreateRating from "./CreateRating";
const AllRatings = () => {
  const [reviews, setReviews] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [searchText, setSearchText] = useState("");

  const userType = localStorage.getItem("Type");

  useEffect(() => {
    const getAllReviews = async () => {
      const res = await getReviews();
      if (searchText) {
        console.log(searchText);
        const filterData = res.filter((data) =>
          data.user.toLowerCase().includes(searchText.toLowerCase())
        );
        setReviews(filterData);
      } else {
        setReviews(res);
      }
    };
    getAllReviews();
  }, [searchText]);
  return (
    <React.Fragment>
      {showReview && (
        <Modal>
          <CreateRating setShowReview={setShowReview} />
        </Modal>
      )}
      <div className="w-full min-h-screen flex flex-col">
        <HeadDiv title="Reviews" />
        <div className="w-full flex flex-col items-center mt-10">
          <div className="w-[50%] flex justify-between items-center">
            <input
              type="text"
              placeholder="Search...."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-[80%] outline-none border-2 border-gray-300 px-3 py-2 rounded-lg focus:border-gray-400"
            />
            {userType === "admin" && (
              <button
                onClick={() => {
                  setShowReview(true);
                }}
                className="text-white bg-[#42A045] px-4 py-2 text-lg hover:opacity-75"
              >
                Create Review
              </button>
            )}
          </div>
          <div className="w-[70%] grid grid-cols-3 gap-10 mt-10 pb-10">
            {reviews.length > 0 &&
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="w-full flex flex-col justify-start items-start shadow-md border p-5 rounded-md hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-gray-700">
                    {review.agent}
                  </h3>
                  <h4 className="text-sm text-gray-700">
                    About <span className="text-md">{review.user}</span>
                  </h4>
                  <h4 className="text-sm text-gray-600">
                    Type : <span>{review.type}</span>
                  </h4>
                  <div className="flex justify-start items-center gap-x-1">
                    <h4 className="text-sm text-gray-600">
                      Rating : {review.rating}
                    </h4>
                    <AiFillStar className="text-[#42A045]" />
                  </div>
                  <p className="text-sm text-gray-700 mt-2 p-1">
                    {review.desc}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AllRatings;
