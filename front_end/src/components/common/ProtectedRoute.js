// import { useAuth0 } from "@auth0/auth0-react";
// import PageLayout from "../../components/layout/pageLayout";
// import React from "react";
// import { Skeleton } from "antd"
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ child })  => {
//     const { isAuthenticated, isLoading } = useAuth0();

//     if (isLoading) return <Skeleton />;

//     return isAuthenticated ? (
//         <PageLayout>{child}</PageLayout>
//     ) : (
//         <Navigate to={"/login"} />
//     );
// };
// export default ProtectedRoute;
