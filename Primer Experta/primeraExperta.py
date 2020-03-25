from experta import *

class Usuario(Fact):
    numeroCuenta = Field(int,mandatory=True)
    pin = Field(int, mandatory=True)
    numeroTarjeta = Field(int, mandatory=True)
    saldoCuenta = Field(int, mandatory=True)

    def setNumCuenta(self,numC):
        numeroCuenta = numC

    def setPin(self,p):
        pin = p

    def setNumTarjeta(self,numT):
        numeroTarjeta = numT

    def setSaldoCuenta(self,sa):
        saldoCuenta = sa

class Cajero(KnowledgeEngine):
    @DefFacts()
    def setSaldoCajero(self,cantidad):
        yield Fact(saldoCajero=cantidad)
        
    @DefFacts()
    def setRetiro(self,cantRetiro):
        yield Fact(retiro=cantRetiro)

    # Aqui se analiza la regla
    #(tarjeta(funciona) V CB(SI) ) ^ NIP(correcto) ^ retiro(valido) ^ saldoCuenta (suficiente) ^ SaldoCajero(suficiente)
    @Rule(
        Usuario( numeroTarjeta=MATCH.nt ) |
        Usuario( numeroCuenta=MATCH.nc ),
        Usuario( pin=MATCH.nc ),
        AS.r << Fact(retiro=MATCH.r),
        TEST( r <= saldoCajero ),
        Usuario( saldoCuenta=MATCH.sc ),
        TEST( sc >= r ),
        TEST( saldoCajero > 0)
    )
    #En caso de que si se cumpla la regla ejecuta la funcion
    def retiro_exitoso(self, r, sc):
        print("Retiro exitoso de {retiro}, su cuenta se queda con {saldoCuenta}".format(
            retiro=r, saldoCajero=sc))


c = Cajero()
u = Usuario()
c.setSaldoCajero(15000)
u.setSaldoCuenta(5000)

print("Ingrese el valor de su retiro:")
c.setRetiro(input())

print("¿Retiro de tarjeta o Cuenta bancaria? (1/0)")
res = input()
if res == "1":
    print("Ingrese el numero de tarjeta:")
    u.setNumTarjeta(input())
elif res == "0":
    print("Ingrese el numero cuenta:")
    u.setNumCuenta(input())

print("Introduzca su pin:")
u.setPin(input())

print("Ingrese el valor de su retiro:")
c.setRetiro(input())
c.reset()
c.run()