import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

const CatDropdown = ({setCats, tags}) => {
    const [options, setOptions] = useState([])
    useEffect(() => {
        const newOptions = []
        tags.forEach(tag => {
            newOptions.push({
                key: tag.id,
                text: tag.name,
                value: tag.id
            })
        })
        setOptions(newOptions)
    }, [tags])
    return (
        <Button basic color='teal' size="small">
            <Dropdown
                multiple
                search
                selection
                onChange={(e, data)=>{setCats(data.value)}}
                options={options}
                placeholder='filter categories'
                className='mini'/>
        </Button>
    )
}

export default CatDropdown
