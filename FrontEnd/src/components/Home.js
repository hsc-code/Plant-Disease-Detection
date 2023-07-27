import "./Home.css";
import plant from './images/plant.png';
function Home() {
    return (
        <>
            {/* <h1>Home☘️🌱🪴🌵🌿</h1> */}
            <div className="container1">
                <h1>🏵️Plant Disease Detection🏵️</h1>

                <div className="body">
                    <div className="plant">
                        <img src={plant} alt="plant"/>
                    </div>
                    <div className="content">
                        <p>Plant Disease Detection is necessary for every farmer so we are created Plant disease detection using Deep learning. In which we are using Convolutional Neural Network for classifying Leaf images into 39 Different Categories. The Convolutional Neural Code build in Pytorch Framework. For Training we are using Plant village dataset</p>
                    </div>
                </div>

                <div className="categories">
                    <div className="c1">
                        <img src="https://post.healthline.com/wp-content/uploads/2020/09/Do_Apples_Affect_Diabetes_and_Blood_Sugar_Levels-732x549-thumbnail-1-732x549.jpg"></img>
                        <h6>Apple</h6>
                    </div>
                    <div className="c1">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNkX9PwImXVpsUnEu69_BZRVNYgUhpQJ6nLw&usqp=CAU"></img>
                        <h6>Blueberry</h6>
                    </div>
                    <div className="c1">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMS9w-BMX5br8CHuVMqjO5Rr9WbMqPCAExbA&usqp=CAU"></img>
                        <h6>Cherry</h6>
                    </div>
                    <div className="c1">
                        <img src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/03/corn-cob-field-1296x728-header.jpg?w=1155&h=1528"></img>
                        <h6>Corn</h6>
                    </div>
                    <div className="c1">
                        <img src="https://minnetonkaorchards.com/wp-content/uploads/2022/04/White-Green-Grapes-SS-1102331153.jpg"></img>
                        <h6>Grape</h6>
                    </div>
                    <div className="c1">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCZIcc3BogbCvOiUuiyZWQptOYzqtZUvIrbg&usqp=CAU"></img>
                        <h6>Orange</h6>
                    </div>
                    <div className="c1">
                        <img src="https://cdn.shopify.com/s/files/1/2045/8185/products/redhaven-peach2_300x300.jpg?v=1642175876"></img>
                        <h6>Peach</h6>
                    </div>
                    <div className="c1">
                        <img src="https://www.almanac.com/sites/default/files/styles/large/public/image_nodes/bell_peppers_dleonis_gettyimages.jpg?itok=Z6m3cDpS"></img>
                        <h6>Bell Pepper</h6>
                    </div>
                    <div className="c1">
                        <img src="https://www.thespruce.com/thmb/6k5-ACTx6OXqmO--k23ddujl9T4=/5750x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-harvest-potatoes-2540062-03-6ef71ddbaa974a2583d7ddf8d74f7c1e.jpg"></img>
                        <h6>Potato</h6>
                    </div>
                    <div className="c1">
                        <img src="https://www.gardeningknowhow.com/wp-content/uploads/2021/07/ripening-raspberries.jpg"></img>
                        <h6>Raspberry</h6>
                    </div>
                    <div className="c1">
                        <img src="https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_745986_16823072833517897.jpg"></img>
                        <h6>Soybean</h6>
                    </div>
                    <div className="c1">
                        <img src="https://hips.hearstapps.com/hmg-prod/images/is-squash-a-fruit-squash-1561591075.jpg"></img>
                        <h6>Squash</h6>
                    </div>
                    <div className="c1">
                        <img src="https://m.media-amazon.com/images/I/71VEOI6MYGL.jpg"></img>
                        <h6>Strawberry</h6>
                    </div>
                    <div className="c1">
                        <img src="https://media.istockphoto.com/id/187110938/photo/garden-tomatoes.jpg?s=612x612&w=0&k=20&c=b1K8Tifv9HqZ3JDnkF3H--yT5wv7NhV2LfTkQGk5RcI="></img>
                        <h6>Tomato</h6>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;
