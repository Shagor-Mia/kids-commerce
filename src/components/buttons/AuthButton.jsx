// "use client";
// import { signOut, useSession } from "next-auth/react";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";

// const AuthButton = () => {
//   const session = useSession();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <div>
//         <Link href={"/login"}>
//           <button className="btn btn-primary btn-outline shadow-none">
//             Login
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {session.status == "authenticated" ? (
//         <button
//           onClick={() => signOut()}
//           className="btn  btn-outline shadow-none"
//         >
//           Logout
//         </button>
//       ) : (
//         <Link href={"/login"}>
//           <button className="btn btn-primary btn-outline shadow-none">
//             Login
//           </button>
//         </Link>
//       )}
//     </div>
//   );
// };

// export default AuthButton;

"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButton = () => {
  const { data: session, status } = useSession();

  //  MUST FIX
  if (status === "loading") {
    return <div className="w-20 h-10 bg-gray-200 animate-pulse rounded"></div>;
  }

  return (
    <div>
      {status === "authenticated" ? (
        <button
          onClick={() => signOut()}
          className="btn btn-outline shadow-none"
        >
          Logout
        </button>
      ) : (
        <Link href={"/login"}>
          <button className="btn btn-primary btn-outline shadow-none">
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
