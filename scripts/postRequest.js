const json =    {
    "id": `11`,
    "from": {
       "name": "Will Smith", 
       "user_id": "will_smith",
       "user_image": "/public/will_smith.jpeg"
    },
    "title": "Sci-fi era",
    "message": "Science Fiction is a science where we find hypothetical visuals",
    "type": "post",
    "comments": [
        {
          "comment_id": `${Number(window.dataLength)+1}_1`,
          "from": {
              "name": "Decaprio",
              "user_id": "decaprio",
              "user_image": "/public/decaprio.jpeg"
          },
          "message": "Bring me my dog back",
          "type": "comment",
          "created_time": "2010-08-02T21:27:44+0000",
          "updated_time": "2010-08-02T21:27:44+0000"
        },
        {
          "comment_id": `${Number(window.dataLength)+1}_2`,
          "from": {
              "name": "Vin Diesel",
              "user_id": "vin_diesel",
              "user_image": "/public/vin_diesel.jpeg"
          },
          "message": "I loved this!",
          "type": "comment",
          "created_time": "2010-08-02T21:27:44+0000",
          "updated_time": "2010-08-02T21:27:44+0000"
        }
    ],
    "created_time": "2010-08-02T21:27:44+0000",
    "updated_time": "2010-08-02T21:27:44+0000"
 }

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

const postForm = body => {
  return fetch('http://localhost:3000/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
};
  

async function handlePostSubmit(e) {
  e.preventDefault();
  const body = JSON.stringify(wrapPostData(e))
  // const body = JSON.stringify(json);
  console.log(window.dataLength, 'hey')
  const res = await postForm(body);
  const data = await res.json();
  console.log('come on',res.json);
  window.dataLength = window.dataLength + 1;
  window.open('http://localhost:4000/', '_self')
  // document.location.reload();
  // setTimeout(init, 2000);
}
  
