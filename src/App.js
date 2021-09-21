import './App.css';
import { AspectRatio, Box, Flex, IconButton, Image, HStack, Text, SimpleGrid, ChakraProvider } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { StarIcon } from '@chakra-ui/icons'
import moment from 'moment';

function Card(props){
  const [liked, setLiked] = useState(false);

  return (
    <Box class="card" key={props.title} py={2} mb={3} px={3} borderWidth="2px" borderColor="gray">
    <Flex direction="row">
       <Text fontSize="2xl" fontWeight="semibold">{props.title}</Text>
       <IconButton
        aria-label="Star your favourite stars"
        icon={<StarIcon />}
        size="lg"
      />       
    </Flex>
    <Image 
      src={props.hdurl} 
      alt={props.title} 
      fit="cover" 
      boxSize="600px" 
      borderColor="gray" 
    />
    <Text color="gray.500">{props.date}</Text>
  </Box>
  )
}

function Gallery(props) {
  return (  
       <SimpleGrid
        //backgroundImage="url('https://images.wallpapersden.com/image/download/starry-sky-night-sky_ZmlrZ26UmZqaraWkpJRmbmdlrWZlbWU.jpg')"
        minChildWidth="600px"
        spacing={4}
        >   
          {props.data.map(item => (
            <Card title={item.title} hdurl={item.hdurl} date={item.date}/>

          ))}
        </SimpleGrid>
  )
}

function App() {
  const today = moment().format('YYYY-MM-DD');
  const lastDay = moment().add(-5, 'days').format('YYYY-MM-DD');
  const [startDay, setStartDay] = useState(lastDay);
  const [endDay, setEndDay] = useState(today);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=wNgH2tb0YaRlOfKGJRiS880mQzNb9giiourwkXeR&count=6`);
      const json = await res.json();
      setData(json);
    }
    fetchData();
    setEndDay(startDay);
    setStartDay(moment().add(-5, 'days').format('YYYY-MM-DD'));
  }, []);

  return (
    <ChakraProvider>
      <Box borderRadius="lg" pb={4} mb={4}>
        <Text align="center" fontWeight="extrabold" fontSize="7xl" bgClip="text" bgGradient="linear(to-r,#7928CA, #FF0080)"> 
          Space photos at astronomically low prices.  
        </Text>
        <Gallery data={data}/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
