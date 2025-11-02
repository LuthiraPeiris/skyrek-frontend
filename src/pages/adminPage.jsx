import { Link, Route, Routes } from "react-router-dom";
import { LuClipboardList, LuBoxes } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlineRateReview } from "react-icons/md";

export default function AdminPage() {
  return (
    <div className="w-full h-full bg-accent flex">
      <div className="w-[300px] h-full max-h-full bg-accent">
        <div className="w-full h-[100px] flex items-center text-primary">
          <img src="/laptoplogo.png" className="h-full" />
          <h1 className="text-2xl">Admin</h1>
        </div>
        <div className="w-full h-[400px] text-white text-2xl flex flex-col">
          <Link
            to="/admin"
            className="w-full flex items-center h-[50px] gap-2.5"
          >
            <LuClipboardList />
            Orders
          </Link>
          <Link
            to="/admin/products"
            className="w-full flex items-center h-[50px] gap-2.5"
          >
            <LuBoxes />
            Products
          </Link>
          <Link
            to="/admin/users"
            className="w-full flex items-center h-[50px] gap-2.5"
          >
            <FaUserGroup />
            Users
          </Link>
          <Link
            to="/admin/reviews"
            className="w-full flex items-center h-[50px] gap-2.5"
          >
            <MdOutlineRateReview />
            Reviews
          </Link>
        </div>
      </div>
      <div className="w-[calc(100%-300px)] h-full max-h-full bg-primary border-2.5 rounded-3xl overflow-y-scroll border-accent">
        <Routes path="/">
          <Route path="/" element={<h1>Orders</h1>} />
          <Route path="/products" element={<h1>Products</h1>} />
          <Route path="/users" element={<h1>Users</h1>} />
          <Route path="/reviews" element={<h1>Reviews</h1>} />
        </Routes>
      </div>
    </div>
  );
}
