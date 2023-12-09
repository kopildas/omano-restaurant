# omano-restaurant
this is a restaurant booking and food ordering website using react and tailwind css.
For accessing admin panel please login via given below username and password,

username: testadminn@gmail.com
password: tes01dance

this is not final output more ui and functional bug need to be fixed.

```
vit
├─ firebase.json
├─ omano
│  ├─ .eslintrc.cjs
│  ├─ .gitignore
│  ├─ dist
│  │  ├─ assets
│  │  │  ├─ booking-126a975f.jpg
│  │  │  ├─ footer6-ab4a0076.jpg
│  │  │  ├─ index-21467f29.js
│  │  │  ├─ index-2ec8f0b8.css
│  │  │  ├─ roasted-pork-steak-dark-wooden-s-af26dc04.jpg
│  │  │  └─ spinner-14e4a09d.svg
│  │  ├─ faviconp.png
│  │  ├─ gif
│  │  │  ├─ food-delivery.gif
│  │  │  ├─ scooter.gif
│  │  │  └─ table.gif
│  │  ├─ images
│  │  │  ├─ avtar.jpg
│  │  │  ├─ booking.jpg
│  │  │  ├─ burg.png
│  │  │  ├─ chicken.png
│  │  │  ├─ dinner.png
│  │  │  ├─ foodCover1.jpg
│  │  │  ├─ foodCover2.jpg
│  │  │  ├─ footer6.jpg
│  │  │  ├─ ice.png
│  │  │  ├─ juice.png
│  │  │  ├─ lunch.png
│  │  │  ├─ menu_cover1.jpg
│  │  │  └─ roasted-pork-steak-dark-wooden-s.jpg
│  │  ├─ index.html
│  │  ├─ logo.png
│  │  └─ pasta.jpg
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public
│  │  ├─ faviconp.png
│  │  ├─ gif
│  │  │  ├─ food-delivery.gif
│  │  │  ├─ scooter.gif
│  │  │  └─ table.gif
│  │  ├─ images
│  │  │  ├─ avtar.jpg
│  │  │  ├─ booking.jpg
│  │  │  ├─ burg.png
│  │  │  ├─ chicken.png
│  │  │  ├─ dinner.png
│  │  │  ├─ foodCover1.jpg
│  │  │  ├─ foodCover2.jpg
│  │  │  ├─ footer6.jpg
│  │  │  ├─ ice.png
│  │  │  ├─ juice.png
│  │  │  ├─ lunch.png
│  │  │  ├─ menu_cover1.jpg
│  │  │  └─ roasted-pork-steak-dark-wooden-s.jpg
│  │  ├─ logo.png
│  │  └─ pasta.jpg
│  ├─ src
│  │  ├─ api
│  │  │  └─ index.js
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  └─ svg
│  │  │     └─ spinner.svg
│  │  ├─ components
│  │  │  ├─ admin_comp
│  │  │  │  ├─ Add_popup.jsx
│  │  │  │  ├─ Delete_popup.jsx
│  │  │  │  ├─ Edit_popup.jsx
│  │  │  │  ├─ Edit_user_pop.jsx
│  │  │  │  ├─ Loadder.jsx
│  │  │  │  ├─ OrderSummary.jsx
│  │  │  │  ├─ Revenu.jsx
│  │  │  │  └─ Sidebar.jsx
│  │  │  ├─ Header.jsx
│  │  │  ├─ home
│  │  │  │  ├─ CartContainer.jsx
│  │  │  │  ├─ CartitemComponenet.jsx
│  │  │  │  ├─ Description.jsx
│  │  │  │  ├─ FeatureFoods.jsx
│  │  │  │  ├─ Food_cover_1.jsx
│  │  │  │  ├─ Footer.jsx
│  │  │  │  ├─ Hero.jsx
│  │  │  │  ├─ Menu.jsx
│  │  │  │  ├─ Reservation
│  │  │  │  │  ├─ Calender.css
│  │  │  │  │  ├─ Calender.jsx
│  │  │  │  │  ├─ TablePop.jsx
│  │  │  │  │  └─ TimeRange.jsx
│  │  │  │  ├─ Reservation.jsx
│  │  │  │  ├─ Review.jsx
│  │  │  │  ├─ RowContainer.jsx
│  │  │  │  ├─ Testimonials.css
│  │  │  │  └─ Testimonials.jsx
│  │  │  ├─ Login.jsx
│  │  │  ├─ OAuth.jsx
│  │  │  ├─ PrivateAdminRoute.jsx
│  │  │  ├─ PrivateRoute.jsx
│  │  │  ├─ Signup.jsx
│  │  │  └─ Spinner.jsx
│  │  ├─ context
│  │  │  ├─ initialState.js
│  │  │  ├─ reducer.js
│  │  │  └─ StateProvider.jsx
│  │  ├─ firebase.js
│  │  ├─ hooks
│  │  │  └─ useAuthStatus.jsx
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ Admin
│  │  │  │  ├─ Admin.jsx
│  │  │  │  ├─ AdOrN.jsx
│  │  │  │  ├─ FoodItems.jsx
│  │  │  │  ├─ Logout.jsx
│  │  │  │  ├─ Reviews.jsx
│  │  │  │  ├─ Users.jsx
│  │  │  │  └─ Wallet.jsx
│  │  │  ├─ Foods.jsx
│  │  │  ├─ ForgotPassword.jsx
│  │  │  ├─ Home.jsx
│  │  │  ├─ Profile.jsx
│  │  │  ├─ Signin.jsx
│  │  │  ├─ SignUp.jsx
│  │  │  └─ SingleFood.jsx
│  │  └─ utils
│  │     ├─ fetchLocalStorageData.js
│  │     └─ firebaseFunctions.js
│  ├─ tailwind.config.js
│  ├─ vercel.json
│  └─ vite.config.js
├─ package-lock.json
├─ package.json
├─ README.md
└─ server
   ├─ .firebaserc
   ├─ .gitignore
   ├─ firebase.json
   ├─ functions
   │  ├─ .eslintrc.js
   │  ├─ .gitignore
   │  ├─ index.js
   │  ├─ package-lock.json
   │  ├─ package.json
   │  ├─ routes
   │  │  ├─ products.js
   │  │  ├─ reviews.js
   │  │  └─ user.js
   │  └─ serviceAccountKey.json
   └─ server
      └─ functions
         └─ index.html

```