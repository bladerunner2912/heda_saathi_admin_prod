const otpGenerator = (() => {
    return Math.round(Math.floor(1000 + (9999 - 1000) * Math.random()));
})

export default otpGenerator;