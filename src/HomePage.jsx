import React, { useState, useEffect, } from 'react';
import Slide from './SlidePage';
import SideIcons from './Sidebar';
import Card from './Card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AppModal from './AppModal';
import Contents from './contents';
import axios from 'axios';



const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

function Main() {
  const [open, setOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState();
  const [category, setCategory] = useState([])
  const [work, setWork] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const createNewUser = () => {
      localStorage.setItem('user', UniqueId());
    }

    const user = localStorage.getItem('user');

    if (!user) {
      createNewUser();

    }
    fetchAPI();
    fetchImage();
  }, []);

  const handleSearch = async (searchItem) => {

    try {
      const response = await fetch('https://api.hubeei.skillzserver.com/api/content/search/4', {
        method: 'POST',
        headers: {
        },
        body: JSON.stringify({ query: searchItem }),
      });

      const data = await response.json();

      if (data.status == "success") {

        setCategory(data.data);
      } else {
        console.error(`API request failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error during API request:, ${error}`);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (items) => {
    let works = work
    setWork(works + 1)
    setSelectedContent(items)
    setOpen(true);
  };

  const fetchAPI = async () => {
    const user = localStorage.getItem('user');
    const headers = {
      'user': user,
    };
    await axios
      .get("https://api.hubeei.skillzserver.com/api/category-content/4", { headers })
      .then((response) => {
        let data = response.data
        if (data.status == "success") {
          setCategory(response.data.data);
        }

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };


  const fetchImage = async () => {
    await axios
      .get("https://api.hubeei.skillzserver.com/api/content/get-spotlight-content/4")
      .then((response) => {
        let data = response.data
        if (data.status == "success") {
          setImage(response.data.data);

        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const UniqueId = () => {
    return 'guest_' + Date.now();
  }

  const createNewUser = () => {
    localStorage.setItem('user', UniqueId());
  };

  return (
    <div className='bg-black border-2 border-yellow-500 h-[100%]'>
      <AppModal open={open} handleClose={handleClose}>
        {selectedContent != null ?
          <div className="fixed inset-0 flex flex-col items-center justify-center   space-y-[20px] h-[100%] w-[100%] mt-4">

            <div className=" p-8 rounded-lg shadow-lg  w-[80%]">
              <h2 className='text-center'>{selectedContent ? selectedContent.name : 'Loading...'}</h2>
            </div>
            <div className=" p-8 rounded-lg shadow-lg w-[100%] h-[100%]" style={{ overflowY: 'auto' }}>
              <div className='text-center w-[70%] h-[100%]  mr-[15] border-2 border-rose-500'>
                <Contents data={selectedContent} />
              </div>
              <div className=" p-8 rounded-lg shadow-lg w-[70%] border-2 border-yellow-500 ">
                <div className='text-yellow-400  border-2 border-yellow-500 flex flex-col items-start flex flex justify-between'>
                  <h1>Description</h1>
                  <h3 className='text-white text-left'>{selectedContent.content_description !== null ? selectedContent.content_description : 'No Description'}</h3>
                  <div className=''>
                    <h1>hjfjj </h1>
                  </div>
                </div>

              </div>

              <div className=" p-8 rounded-lg shadow-lg w-[80%] ">
                <h2 className='text-center'>Engagement</h2>
              </div>
              <div className=" p-8 rounded-lg shadow-lg w-[80%] h-[40%]">
                <h2 className='text-center'>Things and Things</h2>
              </div>

            </div>
          </div>
          : null

        }

      </AppModal>
      <div className='  '>
        <Slide handleOpen={handleOpen} data={image} />
      </div>
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 rounded z-20 ">
        <SideIcons handleSearch={handleSearch} />
      </div>
      <div className=' relative z-10 w-[100%]' >
      <div className=' w-[86%]' style={{ margin: "-20px auto" }}>
        {category.length > 0 ? category.map((categoryItems) => {
          return <div>
            <h1 className='text-white'>{categoryItems.name} </h1>
            <Carousel responsive={responsive} infinite={true} keyBoardControl={true} >
              {categoryItems.content.map((items) => {
                return <Card handleOpen={() => handleOpen(items)} title={items.name} id={items.id} imageUrl={items.thumbnail} liked={items.like} />
              })
              }
            </Carousel>
          </div>
        }) : console.log('khkh', category)}

      </div>
      </div>


    </div>
  )
}

export default Main







