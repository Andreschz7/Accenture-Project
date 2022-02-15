import { Injectable } from '@angular/core';

@Injectable()
export class PostsService {
  id!: number;
    posts = [
     {
      id: 1,
      title: "The waves are high and beautiful",
      shortDescription: "Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella.",
      description: "Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella. Lorem ipsum dolor sit amet enatis sociosqu egestas sociis nibh. Ornare hendrerit fringilla interdum ridiculus consequat euismod condimentum magna. Tortor sollicitudin pharetra mattis fames fusce placerat. Aenean dignissim consequat posuere quam laoreet in luctus mus, orci mattis sapien ullamcorper ad dictum massa quisque parturient, lacus inceptos et ut nulla condimentum eget.",
      category: "Travel",
      image: "https://source.unsplash.com/weekly?nature",
      comments:[
        {
          name: "Andres",
          comment: "asfagadgadsfdagadggad"
        },
        {
          name: "Andres",
          comment: "asfagadgadsfdagadggad"
        }
      ]
      },
      {
        id: 2,
        title: "At the beach in winter",
        shortDescription: "Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella.",
        description: "Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella. Lorem ipsum dolor sit amet enatis sociosqu egestas sociis nibh. Ornare hendrerit fringilla interdum ridiculus consequat euismod condimentum magna. Tortor sollicitudin pharetra mattis fames fusce placerat. Aenean dignissim consequat posuere quam laoreet in luctus mus, orci mattis sapien ullamcorper ad dictum massa quisque parturient, lacus inceptos et ut nulla condimentum eget.",
        category: "Lifestyle",
        image: "https://source.unsplash.com/weekly?beach",
        comments:[]
      },
      {
        id: 3,
        title: "The Edge of Nothing Lake",
        shortDescription: "Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella.",
        description: "Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella. Lorem ipsum dolor sit amet enatis sociosqu egestas sociis nibh. Ornare hendrerit fringilla interdum ridiculus consequat euismod condimentum magna. Tortor sollicitudin pharetra mattis fames fusce placerat. Aenean dignissim consequat posuere quam laoreet in luctus mus, orci mattis sapien ullamcorper ad dictum massa quisque parturient, lacus inceptos et ut nulla condimentum eget.",
        category: "Business",
        image: "https://source.unsplash.com/random",
        comments:[]
      },
      {
        id: 4,
        title: "Five Hundred Twenty",
        shortDescription: "Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella.",
        description: "Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella. Lorem ipsum dolor sit amet enatis sociosqu egestas sociis nibh. Ornare hendrerit fringilla interdum ridiculus consequat euismod condimentum magna. Tortor sollicitudin pharetra mattis fames fusce placerat. Aenean dignissim consequat posuere quam laoreet in luctus mus, orci mattis sapien ullamcorper ad dictum massa quisque parturient, lacus inceptos et ut nulla condimentum eget.",
        category: "travel",
        image: "https://source.unsplash.com/collection/540518/likes/",
        comments:[]
      },
    ];

    addComment(id:number, comments:{name:string, comment:string}) {
      for (let i = 0; i < this.posts.length; i++) {
        const element = this.posts[i];

        if(this.posts[i].id === id)
        this.posts[i].comments.push(comments);
      }
    }

    addPost(pst:{id:number, title:string, shortDescription:string, description:string, category:string, image:string, comments:[] }) {
      pst.id = this.posts.length +1;

        this.posts.push(pst);
      }

    editPost(posts:{id:number, title:string, shortDescription:string, description:string, category:string, image:string, comments:[] }){
      for (let i = 0; i < this.posts.length; i++) {
        const element = this.posts[i];

        if(this.posts[i].id === posts.id)
        this.posts[i].comments.push();
      }
    }  

    deletePost(id:number,){
      

    }

    }

      