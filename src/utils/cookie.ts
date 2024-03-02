export const getCookie = (cname: string) => {
  if (typeof window !== "undefined") {
    var name = cname + "=";
    var ca = document.cookie?.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
};

export const setCookie = (
  cname: string,
  cvalue?: any,
  minutes?: any,
  domain = "path=/;"
) => {
  var d = new Date();
  d.setTime(d.getTime() + minutes * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; " + domain;
};

export const removeCookie = (name: any) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
