from seq import Sequence

def analyze(sequence):
    try:
        seq = Sequence(sequence)
        return {
            'linkageFreq': seq.linkageFreq(),
            'surgarFreq': seq.surgarFreq(),
            'mass': seq.mass()
        }
    except Exception as e:
        return {
            'error': str(e)
        }