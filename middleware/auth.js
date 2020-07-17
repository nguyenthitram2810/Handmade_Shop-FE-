export default function (context) {
    if(localStorage.getItem("token")) {
        context.redirect("/");
      }
}