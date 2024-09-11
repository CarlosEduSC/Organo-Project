import './index.css';
import { useState } from 'react';
import { hexToHsva } from '@uiw/color-convert';
import Colorful from '@uiw/react-color-colorful';
import { ColorResult } from '@uiw/color-convert';

interface SeletorCorProps {
  label: string;
  onCorAlterada: (value: string) => void
}

const SeletorCor = ({ label, onCorAlterada }: SeletorCorProps) => {
  const corInicial = () => {
    let cor = ""
    
    if (label == "Cor Principal") {
      cor = "#D9D9D9"
    }

    if (label == "Cor Secundaria") {
      cor = "#F5F5F5"
    }

    return cor
  }

  const hsvaInicial = () => {
    const corHex = corInicial()
    return hexToHsva(corHex)
  }

  const [color, setColor] = useState<string>(corInicial);
  const [hsva, setHsva] = useState(hsvaInicial);

  const handleColorChange = (newColor: ColorResult) => {
    setHsva(newColor.hsva);
    setColor(newColor.hex);
    onCorAlterada(newColor.hex);
  };

  return (
    <div className='seletor-cor'>
      <label>{label}</label>

      <Colorful
        style={{
          width:"300px"
        }}
        color={hsva}
        onChange={(color) => {
          handleColorChange(color);
        }}
        disableAlpha={true}
      />

      <div
        className='color-show'
        style={{
          backgroundColor: color,
        }}
      />
    </div>
  );
};

export default SeletorCor;