import './index.css';
import { useState } from 'react';
import { hexToHsva } from '@uiw/color-convert';
import Colorful from '@uiw/react-color-colorful';
import { ColorResult } from '@uiw/color-convert';
import { IEquipe } from '../../shared/interfaces/IEquipe';

interface SeletorCorProps {
  label: string;
  equipe?: IEquipe
  onCorAlterada: (value: string) => void
}

const SeletorCor = ({ label, onCorAlterada, equipe }: SeletorCorProps) => {
  const corInicial = () => {
    let cor = ""

    if (label == "Cor Principal") {
      if (equipe != undefined) {
        cor = equipe.corPrimaria
      } else {
        cor = "#D9D9D9"
      }
    }

    if (label == "Cor Secundaria") {
      if (equipe != undefined) {
        cor = equipe.corSecundaria
      } else {
        cor = "#F5F5F5"
      }
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
          width: "300px"
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