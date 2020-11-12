 /**
  * Helps in posting data to the data source with specific format
  * @param {Target Event} e 
  */
 function wrapPostData(e) {
   return {
    "id": `${window.dataLength+1}`,
    "from": {
       "name": "Will Smith", 
       "user_id": "will_smith",
       "user_image": "/public/will_smith.jpeg"
    },
    "title": `${e.target[0].value}`,
    "message": `${e.target[1].value}`,
    "type": "post",
    "comments": [
        {
          "comment_id": `${window.dataLength+1}_1`,
          "from": {
              "name": "Decaprio",
              "user_id": "decaprio",
              "user_image": "/public/decaprio.jpeg"
          },
          "message": "Bring me my dog back",
          "type": "comment",
          "created_time": "2010-08-02T21:27:44+0000",
          "updated_time": "2010-08-02T21:27:44+0000"
        }
    ],
    "created_time": "2010-08-02T21:27:44+0000",
    "updated_time": "2010-08-02T21:27:44+0000"
   }

 }

/**
 * helps in mamking in post request to the data source
 * @param {Body} body -- Body for posting data to data source
 */
const postForm = body => {
  return fetch('http://localhost:3000/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  }).then(() => {
    window.open('/', '_self')
  })
};
  
/**
 * Invoked upon clicking submit button in the popup and handles post submition
 * @param {Target Event} e 
 */
async function handlePostSubmit(e) {
  e.preventDefault();
  const body = JSON.stringify(wrapPostData(e))
  const res = await postForm(body);
  const data = await res.json();
  window.dataLength = window.dataLength + 1;
}
  
