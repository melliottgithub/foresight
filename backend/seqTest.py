from seq import Sequence

# parse sequence
strStr = "-Gdo-Gdo-Ado-Ado-Tdo-Gro-Gro-Cro-Uro-Uro-Uro-Ur"
seq = Sequence(strStr)
print(str(seq) == strStr)

# base sugar frequency
seq = Sequence("-Uro-Uro-Gro-Ums-Um")
print(seq.linkageFreq())
print(seq.surgarFreq())
print(seq.mass())


# bases only
seq = Sequence(strStr)
print(seq.basesOnly(), seq.basesOnly() == '[GGAAT]GGCUUUU')