# SystemBank

### ESTRUTURAS DE DADOS: 
  - BANK
      - Account
          - name
          - cpf (validação: um cpf por pessoa)
          - birthDate (validação: idade maior que dezoito anos)
          - balance
          - Transaction
                  - value 
                  - description
                  - date 

### FUNCIONALIDADES:
- createAccount(name, cpf, birthDate)
- getBalance(name, cpf)
- addBalance(name, cpf, value, today, "Deposito de dinheiro")
- payBill(cpf, value, description, date)
- makeTransfer(depositaryName, depositaryCpf, recipientName, recipientCpf, value)
- updateBalance()