import React, { useEffect, useState, useRef } from 'react';
import { Card, CardBody } from '@chakra-ui/react';
import ResizableComponent from './ResizableComponent';
import '../App.css';
import axios from 'axios';

const Layout = ({componentCount,  updateCount, setComponentCount, setUpdateCount, components, setComponents}) => {
    const resizableRef = useRef(null);

    useEffect(() => {
        getData();
    }, [])

    const fetchCounter = async () => {
        try {
          const info = await axios.get('https://enchanting-gaiters-fly.cyclic.app/api/getCounter');
          console.log("INFOOOO",info.data.info[0])
          setUpdateCount(info.data.info[0].updateCount);
          setComponentCount(info.data.info[0].componentCount)
        } catch (error) {
          window.prompt(error.message)
        }
      }

    const getData = async () => {
        const data = await axios.get('https://enchanting-gaiters-fly.cyclic.app/api/getComponents');
        console.log(data.data.info)
        setComponents(data.data.info)
    }



    const updateComponentSizeAndContent = async (_id, width, height, info) => {
        console.log(_id, width, height, info)
        try {

            await axios.post('https://enchanting-gaiters-fly.cyclic.app/api/updateComponent', {
               initialHeight : height, initialWidth : width, info, _id
            })
            getData()
            fetchCounter()
            
        } catch(error) {
            window.prompt(error.message)
        }
        // window.location.reload()
    };

    const renderComponents = () => {
        const rows = [];
    
        for (let i = 0; i < components.length; i += 2) {
            const rowComponents = components.slice(i, i + 2);
    
            const row = (
                <div key={`row${i}`} className="row">
                    {rowComponents.map((component) => (
                        <div key={component._id} className="col">
                            <Card className="card">
                                <CardBody>
                                    <ResizableComponent
                                        _id={component._id}  // Pass _id as a prop to ResizableComponent
                                        ref={resizableRef}
                                        initialWidth={component.initialWidth}
                                        initialHeight={component.initialHeight}
                                        setUpdateCount={setUpdateCount} 
                                        setComponentCount={setComponentCount} 
                                        updateCount={updateCount} 
                                        componentCount={componentCount}
                                        onUpdateSize={(width, height) =>
                                            updateComponentSizeAndContent(component._id, width, height, component.info)
                                        }
                                        onUpdateContent={(_id, newContent) =>
                                            updateComponentSizeAndContent(component._id, component.initialWidth, component.initialHeight, newContent)
                                        }
                                    >
                                        {component.info}
                                    </ResizableComponent>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            );
    
            rows.push(row);
        }
    
        return rows;
    };
    return <div className="layout">{renderComponents()}</div>;
};

export default Layout;
