MolecularWeight = {
    "A": 347.2212,
    "C": 323.1965,
    "G": 363.2206,
    "T": 322.2085,
    "U": 306.1785,
    "-A": 331.2212,
    "-C": 307.1965,
    "-G": 347.2206,
    "-T": 306.2085,
    "-U": 290.1785,
}

class SequenceElement:

    def __init__(self, encoded):
        try:
            self.mod = encoded[0]
            self.base = encoded[1]
            self.sugar = encoded[2]
            if (len(encoded) > 3):
                self.phosphate = encoded[3]
            else:
                self.phosphate = None
        except:
            raise Exception("Invalid sequence element: " + encoded)

    def __str__(self):
        phosphateStr = "" if self.phosphate is None else self.phosphate
        return self.mod + self.base + self.sugar + phosphateStr

class Sequence:

    def __init__(self, encodedSeq):
        self.elements = []
        start = 0
        for start in range(0, len(encodedSeq), 4):
            encoded = encodedSeq[start:start+4]
            self.elements.append(SequenceElement(encoded))

    def linkageFreq(self):
        freq = {}
        for element in self.elements:
            if element.phosphate not in freq:
                freq[element.phosphate] = 1
            else:
                freq[element.phosphate] += 1
        return freq

    def surgarFreq(self):
        freq = {}
        for element in self.elements:
            key = element.mod + element.base + element.sugar
            if key not in freq:
                freq[key] = 1
            else:
                freq[key] += 1
        return freq

    def mass(self):
        mass = 0
        for element in self.elements:
            weight = MolecularWeight.get(element.mod + element.base)
            if weight is None:
                raise Exception("Unknown element: " + element.mod + element.base)
            mass += weight
        return mass

    def basesOnly(self):
        strSeq = []
        openBracket = False
        for element in self.elements:
            if element.sugar == "d" and not openBracket:
                strSeq.append('[')
                openBracket = True
            elif element.sugar == "r" and openBracket:
                strSeq.append(']')
                openBracket = False

            strSeq.append(element.base)
        return "".join(strSeq)

    def __str__(self):
        return "".join([str(element) for element in self.elements])