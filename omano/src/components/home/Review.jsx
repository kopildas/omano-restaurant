import React from "react";
import { getSpeciReview, getSpeciUser } from "../../api";
import { useState } from "react";
import { useEffect } from "react";
import ReactStar from "react-rating-stars-component";


export default function Review({ food_id }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {

    if (food_id) {
      getSpeciReview(food_id).then((data) => {

        if (data) {
          setReviews(data);

          
          // Call spUserData here for each user_id
          data.forEach((item) => {
            spUserData(item.user_id);
          });
        }
      });
    }
  

  }, []);
  


  const spUserData = (user) => {
    getSpeciUser(user).then((userData) => {

      
      // Update the reviews array with usernames
      const updatedReviews = reviews.map((review) => {
        const matchingUser = userData.find((user) => user.uid === review.user_id);
        if (matchingUser) {
          // If a matching user is found, add the username to the review
          return { ...review, username: matchingUser.displayName };
        } else {
          // If no matching user is found, return the original review
          return review;
        }
      });
  
      setReviews(updatedReviews);
      // return updatedReviews
    });
  };
  


  return (
    <div>
      <div>
        {reviews &&
          reviews.map((item) => (
            <div key={item.productId} className="gap-2 mt-4" >
              <div className="flex flex-row gap-2">
                <div className="h-16 w-16 flex-shrink-0">
                  <img className="h-16 w-16 rounded-full" src={item.user_pic || `../../../public/images/avtar.jpg`} alt=""/>
                </div>
                <div className="text-sm">
              <p className="font font-semibold">{item.user_name || `User`}</p>
              <ReactStar size={20} value={item.rating}  />
              <p>{item.review}</p>
                </div>
              </div>
              
            </div>
          ))}
      </div>
    </div>
  );
}
