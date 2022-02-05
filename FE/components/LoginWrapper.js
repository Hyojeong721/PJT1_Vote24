import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function LoginWrapper({ children }) {
  const { isLoggedIn } = useSelector((state) => state.userStatus);
  const router = useRouter();

  const currentPage = router.pathname;
  const notPublicPages = ["event", "notice", "survey"];
  const pageRootName = currentPage.slice(1).split("/")[0];
  const isPublicPage = !notPublicPages.includes(pageRootName);

  useEffect(() => {
    console.log("Hello", isPublicPage, isLoggedIn);
    if (!isPublicPage && !isLoggedIn) {
      toast.warning("로그인이 필요합니다.");
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isPublicPage && !isLoggedIn) {
    return <div></div>;
  }

  return <>{children}</>;
}

export default LoginWrapper;
