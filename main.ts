radio.onReceivedNumber(function (receivedNumber) {
    if (suiveur_de_ligne == 0) {
        if (obstacle == 0) {
            if (receivedNumber == 0) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, vitesse)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
                basic.pause(100)
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            }
            if (receivedNumber == 1) {
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, vitesse)
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
                basic.pause(100)
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            }
            if (receivedNumber == 3) {
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, vitesse)
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, vitesse)
                basic.pause(100)
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            }
            if (receivedNumber == 3) {
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, vitesse)
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, vitesse)
                basic.pause(100)
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            }
            if (receivedNumber == 4) {
                if (vitesse >= 22) {
                    vitesse = vitesse - 20
                }
            }
            if (receivedNumber == 5) {
                if (vitesse <= 235) {
                    vitesse = vitesse + 20
                }
            }
        }
    }
    if (receivedNumber == 6) {
        suiveur_de_ligne += 1
        while (suiveur_de_ligne == 1) {
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, vitesse)
            }
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, vitesse)
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
            }
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 60)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, vitesse)
            }
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, vitesse)
            }
        }
    }
    if (receivedNumber == 7) {
        suiveur_de_ligne = 0
    }
})
input.onGesture(Gesture.LogoUp, function () {
    while (input.isGesture(Gesture.LogoUp)) {
        radio.sendNumber(2)
    }
})
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(4)
})
input.onGesture(Gesture.TiltRight, function () {
    while (input.isGesture(Gesture.TiltRight)) {
        radio.sendNumber(1)
    }
})
input.onGesture(Gesture.TiltLeft, function () {
    while (input.isGesture(Gesture.TiltLeft)) {
        radio.sendNumber(0)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (auto == 0) {
        auto = 1
        radio.sendNumber(6)
    } else {
        auto = 0
        radio.sendNumber(7)
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(5)
})
input.onGesture(Gesture.LogoDown, function () {
    while (input.isGesture(Gesture.LogoDown)) {
        radio.sendNumber(3)
    }
})
let auto = 0
let obstacle = 0
let suiveur_de_ligne = 0
let vitesse = 0
radio.setGroup(1)
vitesse = 180
basic.forever(function () {
    if (obstacle == 0) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 4) {
            obstacle = 1
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, vitesse)
            basic.pause(1000)
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 0)
            obstacle = 0
        }
    }
})
