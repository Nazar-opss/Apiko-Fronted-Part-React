import AppWrapper from "./Appwrapper.js";
import AppItem from "./AppItem.js";
import Image from "./Image.js";
import { turtles } from "../common/Constants.js";
import GetItemDescription from "../common/utils.js";

export default function App(){
    const items = turtles.map(turtle =>{
        return(
            <div className={turtle.name} key={turtle.name}>
                <AppItem
                    name={turtle.name}
                    image={<Image imgUrl={turtle.imgUrl}/>}
                    description={
                        <GetItemDescription
                            nickName={turtle.nickName}
                            weapon={turtle.weapon}
                        />
                    }
                />
            </div>
        )
    });
    return (
    <AppWrapper
        title={"React turtles"}>
        {items}
    </AppWrapper>   
    )
}