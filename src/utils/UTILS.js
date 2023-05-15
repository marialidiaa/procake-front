class UTILS {
    static CONVERT_UNIDADE_MEDIDA_TEXTO(s) {
        switch (s) {
            case 'KG':
                return "KILOGRAMA (KG)"
            case 'G':
                return "GRAMA (G)"
            case 'MG':
                return "MILIGRAMA (MG)"
            case 'ML':
                return "MILILITRO (ML)"
            case 'L':
                return "LITRO (L)"
            case 'UN':
                return "UNIDADE (UN)"
            default:
                return;
        }
    }

    static CONVERT_UNIDADE_MEDIDA_VALOR(s) {
        switch (s) {
            case 'KILOGRAMA (KG)':
                return "KG"
            case 'GRAMA (G)':
                return "G"
            case 'MG"':
                return "MG"
            case 'MILILITRO (ML)':
                return "ML"
            case 'LITRO (L)':
                return "L"
            case 'UNIDADE (UN)':
                return "UN"
            default:
                return;
        }
    }
}

export default UTILS