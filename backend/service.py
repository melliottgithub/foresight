from seq import Sequence

def analyze(sequence):
    try:
        seq = Sequence(sequence)
        return {
            'linkageFreq': seq.linkageFreq(),
            'surgarFreq': seq.surgarFreq(),
            'mass': seq.mass(),
            'bases': seq.basesOnly(),
        }
    except Exception as e:
        return {
            'error': str(e)
        }