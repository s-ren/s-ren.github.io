import {Tabs, TabsContent, TabsList, TabsTrigger} from "./ui/tabs.tsx";

const TabsButtons = (props:any) => {
    return (
        <Tabs defaultValue="about" className="w-full ">
            <TabsContent value="about">
                {props.about}
            </TabsContent>
            <TabsContent value="portfolio">
                {props.portfolio}
            </TabsContent>
        </Tabs>
    );
};

export default TabsButtons;