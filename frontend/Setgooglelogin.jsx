import { useEffect } from "react";

function SetLoginFromURL() {
   
  const isLoggedIn = document.cookie
  .split('; ')
  .find(row => row.startsWith('isLoggedIn='))
  ?.split('=')[1];

if (isLoggedIn === 'true') {
  localStorage.setItem("isLoggedIn", "true");
}

  useEffect(() => {
    fetch("http://localhost:4000/auth/status", {
      credentials: "include", // if you're using cookies
    })
      .then(res => res.json())
      .then(data => {
        if (data.isLoggedIn) {
          localStorage.setItem("isLoggedIn", "true");
        }
      });
  }, []);
  

  return null; // This component doesn't render anything
}

export default SetLoginFromURL;
