import axios from "axios";

const BASE_URL = "https://api.github.com/";


export function getIssues( org,project, page = 1, perPage = 25,state = "open", creator = "",  labels = [], sortBy = "created", sortDirection = "desc",
 
) {
  let url =
    `${BASE_URL}repos/${org}/${project}/issues?per_page=${perPage}&page=${page}` +
    `&state=${state}&sort=${sortBy}&direction=${sortDirection}`;
  if (creator) {
    url = url.concat(`&creator=${creator}`);
  }
  if (labels.length) {
    url = url.concat(`&labels=${labels.join(",")}`);
  }
 
  return axios
    .get(url, {
      headers: {
        Authorization: "token f8fc7b75d94700d56113ecf79e299a57ed76d14c"
      }
    })
    .then(res => {
      return {
        linkHeader: res.headers["link"],
        data: res.data
      };
    })
    .catch(err => Promise.reject(err));
}
export function getLabels(org, project) {
  let url = `${BASE_URL}repos/${org}/${project}/labels`;
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .catch(err => Promise.reject(err));
}
