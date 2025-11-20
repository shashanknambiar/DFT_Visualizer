class DFT {

  static GetDFT(x)
  {
    const N = x.length;
    const X = [];
    for(let k = 0; k < N; k ++)
      {
       let sum = new Complex(0, 0);
        for(let n = 0; n < N; n ++)
        {
          const phi = (TWO_PI * k * n) / N;
          const c = new Complex(cos(phi), -sin(phi));
          sum = Complex.Add(sum, Complex.Multiply(x[n], c));
        }
        sum.Re = sum.Re / N;
        sum.Im = sum.Im / N;

        let freq = k;
        let amp = sqrt(sum.Re * sum.Re + sum.Im * sum.Im);
        let phase = atan2(sum.Im, sum.Re);
        X[k] = { re: sum.Re, im: sum.Im, freq, amp, phase };
      }
    X.sort((a, b) => b.amp - a.amp);
    return X;
  }
}
