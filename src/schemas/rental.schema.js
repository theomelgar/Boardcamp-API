import Joi from "joi";

export default rentalSchema = Joi.object({
    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    rentDate: Joi.date().required(),    // data em que o aluguel foi feito
    daysRented: Joi.number().required(),             // por quantos dias o cliente agendou o aluguel
    returnDate: Joi.date(),          // data que o cliente devolveu o jogo (null enquanto não devolvido)
    originalPrice: Joi.number().required(),       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
    delayFee: Joi.number()             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
}) 

