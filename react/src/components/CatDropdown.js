import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

const CatDropdown = ({setCats, timelineCats}) => {
    const [options, setOptions] = useState([])
    useEffect(() => {
        const newOptions = []
        timelineCats.forEach(timelineCat => {
            newOptions.push({
                key: timelineCat.id,
                text: timelineCat.name,
                value: timelineCat.id
            })
        })
        setOptions(newOptions)
    }, [timelineCats])
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
