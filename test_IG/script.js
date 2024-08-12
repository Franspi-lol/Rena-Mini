const access_token = '';
const ig_id = '';
const url = `https://graph.instagram.com/v20.0/${ig_id}/media?access_token=${access_token}`; // URL de la API de Instagram, en vez de id puede ser 'me'
const urlMedia = `https://graph.instagram.com/v20.0/me/media?fields=caption,id,media_type,media_url,thumbnail_url,username,children{media_url}&access_token=${access_token}`;

document.addEventListener('DOMContentLoaded', function() {


    async function obtener_user_id_username()
    {
        try
        {
            let response = await fetch ("https://graph.instagram.com/v20.0/me?fields=user_id,username,id,name,account_type,profile_picture_url,followers_count,media_count&access_token="+access_token);
            let data = await response.json();
            console.log(data);
            
            return data;
        }catch(error)
        {
            console.log(error);
            throw error;
        }
    }


    async function obtener_media(urlMedia)
    {
        try
        {
            let response = await fetch(urlMedia);
            let data = await response.json();
            console.log(data);
            //displayPosts(data.data);
            return data;
        }catch(error)
        {
            console.log(error);
            throw error;
        }
    }

    function displayPosts(posts) {
        const div = document.querySelector('.resultado');
        posts.forEach(post => {
            const imagen = document.createElement('img');
            if (post.media_type === 'VIDEO') {
                imagen.src = post.thumbnail_url;
            }else if (post.children) {
                post.children.data.forEach(child => {
                    const childImage = document.createElement('img');
                    childImage.src = child.media_url;
                    div.appendChild(childImage);
                });
            }else{
            imagen.src = post.media_url;}
            
            div.appendChild(imagen);
        });
        
      }
      

      async function postear_media()
      {
            try
            {
                let data = await obtener_media(urlMedia);
                console.log('datazo' ,data);
                displayPosts(data.data);
                return data;
            }catch(error)
            {
                console.log(error);
                throw error;
            }
      }

    /* function crearImagenHTML(url) {
        const imagen = document.createElement('img');
        imagen.src = url;
        const div = document.querySelector('.resultado');
        div.appendChild(imagen);
    } */
    obtener_user_id_username();
    postear_media();


    

});