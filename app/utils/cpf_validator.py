def verificaCpf(cpf_num):
    # Codigo Elaborado com o ChatGPT, para que seja validado todos os CPF's
    # Devido todos os CPF terem uma validação com os dois ultimos numeros.
    erro = "Erro: "
    try:
        cpf = str(cpf_num).strip()
        cpf = cpf.replace(".", "").replace("-", "")
        # Verificar se o CPF tem 11 dígitos
        if len(cpf) != 11:
            return False
        # Verificar se todos os dígitos são iguais
        if cpf == cpf[0] * 11:
            return False
        # Cálculo do primeiro dígito verificador
        soma = 0
        for i in range(9):
            soma += int(cpf[i]) * (10 - i)
        resto = soma % 11
        if resto < 2:
            digito_verificador_1 = "0"
        else:
            digito_verificador_1 = str(11 - resto)
        # Cálculo do segundo dígito verificador
        soma = 0
        for i in range(10):
            soma += int(cpf[i]) * (11 - i)
        resto = soma % 11
        if resto < 2:
            digito_verificador_2 = "0"
        else:
            digito_verificador_2 = str(11 - resto)
        # Verificar se os dígitos verificadores são iguais aos dígitos fornecidos
        if cpf[-2:] == digito_verificador_1 + digito_verificador_2:
            return cpf
        else:
            return False
    except:
        return False
