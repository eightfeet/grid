import React, { useCallback, useState } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { values } from 'lodash';



const GradientSlider = () => {
    const [valuse, setValuse] = useState<number[]>([])

    const addMarks = useCallback(
        () => {
            const data: number[] = [...valuse];
            data.map((item, index) => {
                if (index === 0 ) {
                    return item;
                } else {
                    return item - 1
                }
            })
            data.push((data[data.length - 1] || 0) + 1);
            setValuse(data)
        },
        [valuse],
    )
    const onChangeSlider = useCallback(
        (value, e) => {
            setValuse(value);
            console.log(value, e)
        },
        [],
    )
    const marks = {
        100: <strong onClick={addMarks}>+</strong>,
      };
    return (
        <div className="GradientSlider">
            <Slider.Range onAfterChange={da => console.log(da)} min={0} max={100} marks={marks} onChange={onChangeSlider} value={valuse} />
        </div>
    )
}

export default GradientSlider;