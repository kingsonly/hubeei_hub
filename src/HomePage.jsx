import React, { useState } from 'react';
import Slide from './SlidePage';
import SideIcons from './Sidebar';
import Card from './Card';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import AppModal from './AppModal';

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
  const [work, setWork] = useState(0);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (e) => {
    let works = work
    setWork(works + 1)
    setOpen(true);
  };

  return (
    <div className='bg-[#000]/90'>
      <AppModal open={open} handleClose={handleClose} >
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50  space-y-[20px] h-[100%] w-[100%] mt-4">
          <div className="bg-yellow-500 p-8 rounded-lg shadow-lg  w-[80%]">
            <h2 className='text-center'>Title {work}</h2>
          </div>
          <div className="bg-yellow-500 p-8 rounded-lg shadow-lg w-[80%] h-[40%]">
            <h2 className='text-center'>Main content</h2>
          </div>
          <h3 className="bg-yellow-500 p-8 rounded-lg shadow-lg w-[80%] text-center">Text Description</h3>
          <div className="bg-yellow-500 p-8 rounded-lg shadow-lg w-[80%] ">
            <h2 className='text-center'>Engagement</h2>
          </div>
          <div className="bg-yellow-500 p-8 rounded-lg shadow-lg w-[80%] h-[40%]">
            <h2 className='text-center'>Things and Things</h2>
          </div>
          <div className=" rounded-lg shadow-lg w-[80%] h-[40%] border-2 border-rose-500">
            <Carousel responsive={responsive} infinite={true} keyBoardControl={true} >
              <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/life.jpg')} />
              <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/couple.jpg')} />
              <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/Building-4.jpg')} />
              <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/Building-9.jpg')} />
              <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/Building-10.jpg')} />
              <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/Building-11.jpg')} />
            </Carousel>
          </div>
        </div>

      </AppModal>
      <Slide handleOpen={handleOpen}/>
      <SideIcons />
      <div className='relative z-10 w-[86%]' style={{ margin: "-80px auto" }}>
        <div>
          <h1 className='text-white'> this is just a rest </h1>
          <Carousel responsive={responsive} infinite={true} keyBoardControl={true} >
            <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/life.jpg')} />
            <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/couple.jpg')} />
            <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/Building-4.jpg')} />
            <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/Building-9.jpg')} />
            <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/Building-10.jpg')} />
            <Card handleOpen={handleOpen} title={'Image'} id={1} imageUrl={require('./Images/Building-11.jpg')} />
          </Carousel>
        </div>

      </div>


    </div>
  )
}

export default Main







