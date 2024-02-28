import React, { useEffect, useState, useRef } from 'react';
import { Card, CardBody } from '@chakra-ui/react';
import ResizableComponent from './ResizableComponent';
import '../App.css';
import axios from 'axios';

const Layout = () => {
    const resizableRef = useRef(null);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const data = await axios.get('https://enchanting-gaiters-fly.cyclic.app/api/getComponents');
        console.log(data.data.info)
        setComponents(data.data.info)
    }

    const handleMouseLeave = async () => {
        const { width, height } = resizableRef.current.state;
        console.log(width,height)
    };


    const [components, setComponents] = useState([]);
    const updateComponentSizeAndContent = async (_id, width, height, info) => {
        console.log(_id, width, height, info)

        await axios.post('https://enchanting-gaiters-fly.cyclic.app/api/updateComponent', {
           initialHeight : height, initialWidth : width, info, _id
        })
        setComponents((prevComponents) =>
            prevComponents.map((component) =>
                component._id === _id
                    ? { ...component, initialWidth: width, initialHeight: height, info }
                    : component
            )
        );
        window.location.reload()
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
