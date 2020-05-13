from random import choice
from experta import *

class Usuario(Fact):
    numeroTarjeta = Field(str, mandatory=True)
    numeroCuenta = Field(str,mandatory=True)
    nip = Field(str, mandatory=True)
    saldoCuenta = 0

    def setSaldoCuenta(self,sa):
        self.saldoCuenta = sa

    def getSaldoCuenta(self):
        return self.saldoCuenta

class Cajero(KnowledgeEngine):
    saldoCajero=choice([1000,5000,7000])
    cantRetiro=0
    #saldoCuenta (suficiente)
    u = Usuario()
    u.setSaldoCuenta(choice([2000,4000,7000]))

    @DefFacts()
    def setSaldoCajero(self):
        if self.saldoCajero > 0 :
            yield Fact(saldoCajero="valido")
        else :
            yield Fact(saldoCajero="invalido")
    
    @DefFacts()
    def setRetiro(self):
        if self.cantRetiro <= self.saldoCajero :
            yield Fact(retiro="valido")
        else :
            yield Fact(retiro="invalido")
            print("Haciendo un retiro de {money}\nEl cajero tiene {sc}".format(
                money=self.cantRetiro,sc=self.saldoCajero))

    # Se analiza las regla
    #(numeroTarjeta(valida) V numeroCuenta(valida) ) ^ NIP(correcto) 
    @Rule(
        Usuario( numeroTarjeta="valida" ) | Usuario( numeroCuenta="valida" ),
        Usuario( nip="correcto" )
    )
    def cuenta_valida(self):
        Fact(cuenta_valida="valida")
        print("Su cuenta es válida. Usted tiene {sc}".format(sc=self.u.getSaldoCuenta() ))

        if self.u.getSaldoCuenta() >= self.cantRetiro :
            Fact(saldoCuentaU="suficiente")
        else :
            Fact(saldoCuentaU="insuficiente")
            print("Su cuenta no tiene tanto dinero. Tiene {sc}".format(sc=self.u.getSaldoCuenta() ))

    #Se analiza la regla 
    #saldoCuenta (suficiente) ^ SaldoCajero(suficiente)
    @Rule(
        Fact(cuenta_valida="valida"),
        Fact(saldoCuentaU="suficiente"),
        Fact(saldoCajero="suficiente")
    )
    def retiro_valido(self):
        Fact(retiro="valido")

    #Se analiza la regla 
    # retiro(valido)
    @Rule(Fact(retiro="valido"))
    def retiro_exitoso(self):
        print("Saldo del cajero: {sc}".format(sc=self.saldoCajero))
        resta= self.u.saldoCuenta
        resta-= self.cantRetiro
        print("Retiro exitoso, su cuenta se queda con {sc}".format( sc= resta ))

c = Cajero()
c.reset()
c.setSaldoCajero()

#(numeroTarjeta(valida) V numeroCuenta(valida) ) ^ NIP(correcto) 
c.declare(Usuario(numeroTarjeta="valida",
                numeroCuenta="invalida",
                nip="correcto") )

print("Ingrese la cantidad de retiro:")
c.cantRetiro = int(input())

c.run()